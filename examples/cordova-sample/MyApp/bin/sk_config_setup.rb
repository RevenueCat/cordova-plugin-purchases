require 'xcodeproj'

project_path = 'platforms/ios/HelloCordova.xcodeproj'
project = Xcodeproj::Project.open(project_path)

require 'pp'
scheme = Xcodeproj::Project.schemes(project_path)
pp scheme