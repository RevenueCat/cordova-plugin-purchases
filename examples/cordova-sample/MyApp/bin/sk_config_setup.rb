# This script adds:
# StoreKit config file into the debug scheme and project.
# refresh_javascript_sources_ios.sh as a build phase run script.
# This way every time the project is regenerated we don't have to
# reconfigure the workspace.

require 'xcodeproj'

def save_project_if_needed(project, modified = false)
    return unless modified

    puts("Saving project")
    project.save
end

def add_store_kit_to_project_if_needed(project, storekit_file_path)
    puts("Checking if StoreKit Config exists in #{project.path}")
    modified = false
    already_exists = project.files.any? { |file| file.path == storekit_file_path }
    if not already_exists 
        puts(" - Missing, adding.")
        project.new_file(storekit_file_path)
        modified = true
    else 
        puts(" - Exists, skipping.")
    end
    return modified
end

def add_build_phase_run_script_if_needed(project, run_script_name = 'Refresh js resources')
    puts("Checking '#{run_script_name}' run script exists in all targets")
    modified = false
    for target in project.targets 
        phase = target.shell_script_build_phases().find {|item| item.name == run_script_name}
        if (phase.nil?)
            phase = target.new_shell_script_build_phase(run_script_name)
            phase.shell_script = "$PROJECT_DIR/../../bin/refresh_javascript_sources_ios.sh"
            puts(" - Missing in #{target.name}, adding.")
            modified = true
        else
            puts " - Exists in '#{target.name}', skipping."
        end
    end
    return modified
end

def add_swift_version_if_needed(project, swift_version_to_set = "5.0")
    puts("Build configurations missing Swift version?")
    modified = false
    for build_config in project.build_configurations
        swift_version = build_config.build_settings["SWIFT_VERSION"]
        if (swift_version.nil?)
            puts(" - #{build_config.name} missing, setting version #{swift_version_to_set}.")
            build_config.build_settings["SWIFT_VERSION"] = swift_version_to_set
            modified = true
        else
            puts(" - #{build_config.name} already set to #{swift_version}, skipping.")
        end
    end
    return modified
end

def update_scheme_with_store_kit_file_if_needed(workspace_path, storekit_file_path_for_xcproject)
    shared_data_dir = Xcodeproj::XCScheme.shared_data_dir(workspace_path)
    scheme_filename = "HelloCordova.xcscheme"
    scheme_path = File.join(shared_data_dir, scheme_filename)

    sk_node_label = 'StoreKitConfigurationFileReference'
    puts("Checking if Scheme: #{scheme_path} needs #{sk_node_label} added")
    scheme = Xcodeproj::XCScheme.new File.join(shared_data_dir, scheme_filename)

    # check if element exists
    unless scheme.launch_action.xml_element.elements[sk_node_label].nil?
        puts(" - No, StoreKitConfigurationFileReference already exists")
        return
    end

    storekit_file_path_for_xcscheme = "../#{storekit_file_path_for_xcproject}"

    sk_config = REXML::Element.new(sk_node_label)
    puts(" - Yes, creating: #{sk_node_label} node and adding `identifier` attribute: #{storekit_file_path_for_xcscheme}")
    sk_config.attributes['identifier'] = storekit_file_path_for_xcscheme
    scheme.launch_action.xml_element.add_element(sk_config)

    puts("Saving scheme")
    scheme.save!
end

# Script start
workspace_path = 'platforms/ios/HelloCordova.xcworkspace'
puts("Workspace: #{workspace_path}\n")

project_path = 'platforms/ios/HelloCordova.xcodeproj'
project = Xcodeproj::Project.open(project_path)
puts("Project: #{project.path}\n")

storekit_file_path_for_xcproject = '../../RevenueCatTest.storekit'


modified = add_store_kit_to_project_if_needed(project=project, storekit_file_path_for_xcproject)
modified = add_build_phase_run_script_if_needed(project) || modified
modified = add_swift_version_if_needed(project, save=true) || modified
save_project_if_needed(project, modified)
update_scheme_with_store_kit_file_if_needed(workspace_path, storekit_file_path_for_xcproject)

puts("Done! 🎉")
