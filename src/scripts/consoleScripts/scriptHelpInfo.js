

export async function helpInfo(){
  console.log(`\n \x1B[1;32m***  HELP Info.  ***\x1B[0m`);
  console.log(`
    \x1B[3;34m Flags:\x1B[0m \n
      \x1B[34m--help or -h \x1B[0m    ==>  \x1B[35m Display Help Options.\x1B[0m
      \x1B[34m--version or -v \x1B[0m ==>  \x1B[35m Display CLI version.\x1B[0m
      \x1B[34m--git or -g \x1B[0m     ==>  \x1B[35m (Only for command "new")Create an empty Git repository without asking.\x1B[0m
      \x1B[34m--yes or -y \x1B[0m     ==>  \x1B[35m (Only for command "new")Create a project with the default options, it only asks for the name of the project.\x1B[0m
      \x1B[34m--install or -i \x1B[0m ==>  \x1B[35m (Only for command "new")Install all dependencies automatically.\x1B[0m
      \x1B[34m--joint or -j \x1B[0m   ==>  \x1B[35m (Only for command "Component")Integrate the style sheet of the Web Component to its javascript module.\x1B[0m \n
    \x1B[3;34m Commands:\x1B[0m \n
      \x1B[34mnew or n \x1B[0m          ==>  \x1B[35m Create a new project.\x1B[0m
      \x1B[34mcomponent or c \x1B[0m    ==>  \x1B[35m Create a new component.\x1B[0m \n
    \x1B[3;34m Options:\x1B[0m \n
      \x1B[34mnew proyect-name \x1B[0m           ==>  \x1B[35m 1)  Create a new project with the name "project-name".
                                        2)  If the --yes flag is added, a project named "project-name" will be created with the default options.
                                        3)  If the --git flag is added, a project "project-name" will be created and an empty git repository will be started.
                                        4)  If the --install flag is added, a project named "project-name" will be created and the necessary
                                            dependencies will be installed automatically.\x1B[0m \n
      \x1B[34mcomponent componentName \x1B[0m    ==>  \x1B[35m 1)  Create a new component with the name "componentName".
                                            ATTENTION: the name of the web component must be two words or more, united and written in camel case format,
                                            like "componentName".
                                            The script will create a web component "<component-name></component-name>" in a folder "componentName".
                                        2)  If the --joint flag is added, a "componentName" web component will be created with the style
                                            sheet integrated into the javascript module.\x1B[0m
  `);
  return;
}