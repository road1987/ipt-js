module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        concat : {
            js : {
                src: ['core.js',
                      'src/events/EventObject.js',
                      'src/events/EventListenerList.js',
                      'src/events/EventDispatcher.js',
                      
                      'src/dnd/DragDropMgr.js',
                      'src/dnd/dropTarget.js',
                      'src/dnd/dragSource.js',
              
                      'src/layout/FlowLayout.js',	
                      'src/layout/MenuLayout.js',
                      'src/ComponentMgr.js',
                      'src/Component.js',
                      'src/Container.js',
                      
                      
                      'src/Toolbar.js',
                      'src/button/BaseButton.js',
                      'src/button/Button.js',
                      
                      'src/menu/MenuMgr.js',
                      'src/menu/MenuItem.js',                     
                      'src/menu/Menu.js',
                      
                      'src/Panel.js',
                      'src/TabPanel.js',
                      'src/window/WindowMgr.js',
                      'src/window/Window.js',
                      'src/MsgBox.js',
                      
                      'src/form/Label.js',
                      'src/form/Field.js',
                      'src/form/File.js',
                      'src/form/TextField.js',
                      'src/form/TextArea.js'
                ],
                dest: 'dest/ipt.js'
            },
            
            css : {
                src: ['themes/default/*.css' ,'!themes/default/ipt.css' , '!themes/default/ipt-min.css'],
                dest: 'themes/default/ipt.css'
            }
        },
        uglify : {
           options:{
                mangle: true,
                banner : '/*! <%= pkg.name %>  <%=pkg.version %>  <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                src : 'dest/ipt.js',
                dest : 'dest/ipt-min.js'
            }
        },
        
        cssmin: {
            css: {
                src : 'themes/default/ipt.css',
                dest : 'themes/default/ipt-min.css'
            }
        }
    });
    // 载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 注册任务
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
