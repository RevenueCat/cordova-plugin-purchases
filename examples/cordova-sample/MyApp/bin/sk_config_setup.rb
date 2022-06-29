# This script adds:
# StoreKit config file into the debug scheme and project.
# refresh_javascript_sources_ios.sh as a build phase run script.
# This way every time the project is regenerated we don't have to
# reconfigure the workspace.

require 'xcodeproj'

workspace_path = 'platforms/ios/HelloCordova.xcworkspace'
puts("Workspace: #{workspace_path}\n")

project_path = 'platforms/ios/HelloCordova.xcodeproj'
puts("Project: #{project_path}\n")

storekit_file_path_for_xcproject = '../../RevenueCatTest.storekit'
storekit_file_path_for_xcscheme = "../#{storekit_file_path_for_xcproject}"

puts("Adding StoreKit Config to project")
project = Xcodeproj::Project.open(project_path)
project.new_file(storekit_file_path_for_xcproject)

run_script_name = 'Refresh js resources'
puts("Adding '#{run_script_name}' run script to all targets:")
for target in project.targets 
    phase = target.shell_script_build_phases().find {|item| item.name == run_script_name}
    if (phase.nil?)
        phase = target.new_shell_script_build_phase(run_script_name)
        phase.shell_script = "$PROJECT_DIR/../../bin/refresh_javascript_sources_ios.sh"
        puts("Added to target: #{target.name}")
    else
        puts "Ignored target '#{target.name}', script already existed"
    end
end

project.save

shared_data_dir = Xcodeproj::XCScheme.shared_data_dir(workspace_path)
scheme_filename = "HelloCordova.xcscheme"
scheme_path = File.join(shared_data_dir, scheme_filename)

puts("Using Scheme: #{scheme_path}")
scheme = Xcodeproj::XCScheme.new File.join(shared_data_dir, scheme_filename)

# check if element exists
sk_node_label = 'StoreKitConfigurationFileReference'
unless scheme.launch_action.xml_element.elements[sk_node_label].nil?
	puts("No need to modify Scheme, StoreKitConfigurationFileReference already exists")
	exit
end

sk_config = REXML::Element.new(sk_node_label)
puts("Creating: #{sk_node_label} node and adding `identifier` attribute: #{storekit_file_path_for_xcscheme}")
sk_config.attributes['identifier'] = storekit_file_path_for_xcscheme
scheme.launch_action.xml_element.add_element(sk_config)

puts("Saving scheme")
scheme.save!

puts("Done!")
