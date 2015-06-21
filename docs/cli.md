## Output node-motion

```

                                                                                 
                       _                            _   _                        
       _ __   ___   __| | ___       _ __ ___   ___ | |_(_) ___  _ __             
      | '_ \ / _ \ / _` |/ _ \_____| '_ ` _ \ / _ \| __| |/ _ \| '_ \            
      | | | | (_) | (_| |  __/_____| | | | | | (_) | |_| | (_) | | | |           
      |_| |_|\___/ \__,_|\___|     |_| |_| |_|\___/ \__|_|\___/|_| |_|           
                                                                                 
                                                                Version : 0.1.2
                                                                By      : @j3lte


 Node motion : Control motion with NodeJS

 Usage : node-motion [OPTIONS] [CONFIG-FILE]

 Configuration-file can either be a JSON or a .conf file

 If you experience issues, report them here: https://github.com/j3lte/node-motion/issues

Options:
  -n, --no_webserver  Do not start a preview server                                
  -v, --videodevice   Videodevice (e.g. /dev/video0) (overridden by config-file)   
  -c, --control_port  Controlport for motion (overridden by config-file)             [default: 9000]
  -s, --webcam_port   Port for motion stream (overridden by config-file)             [default: 9001]
  -b, --motion_bin    Path to motion binary, in case it is not available in $PATH  
  -p, --preview_port  Port for hosting the preview server (http://localhost:<port>/  [default: 3000]
  -d, --debug         Verbose debug output                                         
  -h, --help          Shows this help screen                                       
  -u, --update        Checks if there is an update for node-motion                 

```
