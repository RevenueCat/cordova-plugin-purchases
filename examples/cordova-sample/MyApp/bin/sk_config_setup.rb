# This script adds the StoreKit config file into the debug scheme
# that way everytime the project is regenerated, we don't have to
# reconfigure the workspace each time.
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
