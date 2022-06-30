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

puts("Checking if we need to add the StoreKit Config to xcproject")
project = Xcodeproj::Project.open(project_path)
already_exists = false
for file in project.files
    if file.path == storekit_file_path_for_xcproject
        puts("StoreKit Config already exists in the project")
        already_exists = true
        break
    end
end
if not already_exists 
    puts("Adding StoreKit Config to project")
    project.new_file(storekit_file_path_for_xcproject)
end

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

swift_version_to_set = "5.0"
puts("Updating build configuration if they are missing Swift version")
for build_config in project.build_configurations
    swift_version = build_config.build_settings["SWIFT_VERSION"]
    if (swift_version.nil?)
            puts("Setting version #{swift_version_to_set}")
        build_config.build_settings["SWIFT_VERSION"] = swift_version_to_set
    else
        puts("Version #{swift_version} already existed, leaving as-is")
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
