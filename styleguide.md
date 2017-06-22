Primed Minds Style Guide
File Locations
 Images – “assets/[page name]/[img title].jpg
o i.e. an image for the about page would be under: assets/about/arrow.jpg
 Javascript
o That you wrote yourself - “javascript/[page name].js”
 NOTE: name of the js file should match the name of the .html!
 i.e. about.html will link to javascript/about.js
o That you import – “public/javascript/name.js”
o Avoid putting scripts into the html file itself.
Instead, place them in a separate .js file linked to your .html
 CSS – “stylesheets/[page name].css
o NOTE: name of the CSS file should match the name of the .html!
Naming
 Static Global Variables: name with ALL_CAPS_AND_UNDERSCORES
o if this variable isn’t going to change throughout the code but is used multiple times
o i.e. GRAPH_HEIGHT = 500;
 Other variables: lowerCamelCase
 Functions: lowerCamelCase
 Descriptive names
o “monsters”, not just “object”
 No unnecessary adjectives
o Do not use “mySlides”, just “slides”
General
 Opening brackets are preceded with a space but are on the same line {
 // The rest of your code goes here and is indented one tab
 // The following lines should be the same indentation.
 // If you open another bracket {
 // Start another indent
 } // But close it on the same line!
}; // Closing brackets go on their own separate line
 Comment comment comment! When in doubt, comment about every 20 lines
o Quick comments at the top of a function describing what it does go a long way!
 Break down functions
o Try to have functions remain about 20 lines or less
o If the function starts getting really long, ask yourself if you could break it up into two 
