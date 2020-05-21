// This script should be loaded at boot.
// Put it in /a/boot/
// _variableName <= this variable is unused
// TODO: Improve code
// TODO: Minify the code a little bit, but it should be readable
// TODO: Use typeof "something" instead of typeof("something")

// @todo Make helper.js JSHint-beautiful or very close to it
// @body Add missing semicolons, get rid of "confusing use of !".


console.log('[Py93Helper] Started execution');
/**
 * @description Py93's stuff
 * @global
 */
var $py93 = {};

$py93.launchShell = function() {
    $fs.utils.getMenuOpenWith('/a/Py93/console.html')[0].action();
}

/**
 * @description Py93 Package Manager's stuff
 */
$py93.pm = {};

/**
 * An array that contains all supported by this version
 * versions of package JSON file syntax.
 */
$py93.pm.supportedVers = [1]

/**
 * Shell will get data from shellGate using window.parent
 */
$py93.shellGate = {};

$py93.shellGate.ignore = false;
$py93.shellGate.pkgConts = [];
$py93.help = 'Py93 Menu: usage:\nh, help - print this help message\ns, shell - launch Py93 shell\nc, compile - launch py93compile (Py93 Compiler)\nUse py93 [compile or c] [help or h] to see py93compile usage.\nUse py93 [s or shell] [--help or -h] to see shell launcher options.'
le._apps.py93 = {
    exec: function() {
        var args = this.arg.arguments;
        if (args[0] == "shell" || args[0] == "s") {
            $py93.shellGate.ignore = false;
            var dry = false;
            var shellAttrs = this.arg.command.split(' ')
            shellAttrs.forEach((attr) => {
                if (attr == "--packages-ignore" || attr == "-pi") {
                    $log(`Detected ${attr} option`)
                    $py93.shellGate.ignore = true;
                } else if (attr == '-h' || attr == '--help') {
                    dry = true;
                    $log(`Detected ${attr} option`)
                    $log('Py93 Menu: Shell launcher: usage:\npy93 [s or shell] [-h or --help] [-pi or --packages-ignore]\n-h or --help - print this help message\n-pi or --packages-ignore - use these options if you don\'t want to load packages from packages folder in the shell.')
                }
            })
            if (!dry) {
                if (!$py93.shellGate.ignore) $log('Creating list of packages...')
                $py93.shellGate.pkgConts = [];
                $fs.utils.getFileMenu('/a/Py93/packages')["foldersList"].forEach((name) => {
                    $db.getRaw('Py93/packages/'+name, function(_a, file) {
                        $py93.shellGate.pkgConts.push(file)
                    })
                })
                setTimeout($py93.launchShell, 500)
            }
        } else if (args[0] == "help" || args[0] == "h") {
            $log($py93.help);
        } else if (args[0] == "compile" || args[0] == "c") {
            if (
                this.arg.command == "py93 compile" ||
                this.arg.command == "py93 compile " ||
                this.arg.command == "py93 c" ||
                this.arg.command == "py93 c " ||
                this.arg.command == "py93 compile help" ||
                this.arg.command == "py93 compile h" ||
                this.arg.command == "py93 c help" ||
                this.arg.command == "py93 c h"
            ) {
                $log('Py93 Menu: py93compile: usage:\npy93 [compile or c] [help or h] [filepath] [--name NAME] [--packages-ignore or -pi] [-o or --out OUTDIR]\n===========================================================\nUse "help" or "h" to see this help message.\nfilepath - path to .py file that needs to be compiled\n--name NAME - output file name.\nExample: "py93 c /a/w93.py --name windows93" => file w93.py in /a/ has been compiled and saved as windows93.html.\n(If there\'s no --name option, the target file name will be the same as the source.)\n--packages-ignore or -pi - use these options if don\'t want to load packages from "packages" folder in the compiled file.\n-o or --out OUTDIR - use these options to set the output directory.\n(If there\'s no --out or -o option, the standard output directory will be used (/a/Py93/compiled/))\nWorking command example: py93 c /a/w93.py --name windows93 -pi --out a/desktop');
            } else {
                let attrs = this.arg.command.split(' ');
                var compFile;
                compFile = attrs[2];
                if (compFile[0] == '/') compFile = compFile.substr(1);
                if (compFile[0] == 'a' && $fs.utils.getExt(compFile) == 'py') {
                    success = true;
                } else {
                    success = false;
                    if (compFile[0] == 'c') {
                        $log.red('py93compile: compiler error: can\'t get file from /c/');
                    }
                    if ($fs.utils.exist(compFile) == false) {
                        $log.red('py93compile: compiler error: file does not exist');
                    }
                    if (!($fs.utils.getExt(compFile) == 'py')) {
                        $log.red('py93compile: compiler error: only .py files supported');
                    }
                    if (!(compFile[0] == 'c') && !($fs.utils.exist(compFile) == false) && !(!($fs.utils.getExt(compFile) == 'py'))) {
                        $log.red('py93compile: compiler error: can\'t get file\nDebug information: 1, unknown reason');
                    }
                }
                if (success) {
                    compFile = compFile.substr(2);
                    var outConts;
                    function dbCallback(_a, file) {
                        outConts = file;
                    }
                    $db.getRaw(compFile, dbCallback);
                    var name = null;
                    var packages = {};
                    var stdoutdir = /*'/a/*/'Py93/compiled/';
                    var outdir = /*'/a/*/'Py93/compiled/';
                    packages.ignore = false
                    attrs.forEach((attr) => {
                        if (attr == '--name') {
                            $log('Detected --name option');
                            let nameid = attrs.indexOf("--name");
                            name = attrs[nameid + 1];
                        } else if (attr == '--packages-ignore' || attr == '-pi') {
                            $log(`Detected ${attr} option`)
                            packages.ignore = true
                        } else if (attr == '--out' || attr == '-o') {
                            $log(`Detected ${attr} option`)
                            let outid = attrs.indexOf(`${attr}`)
                            let wrong = false;
                            outdir = attrs[outid + 1]
                            // doing some validation
                            if (outdir[0] == "/") outdir = outdir.substr(1) // a/path/
                            if (outdir[0] != "a") {
                                wrong = true;
                                if (outdir[0] == "c") $log.red('py93compile: compiler error: can\'t write to /c/, using standard output directory.');
                                else $log.red('py93compile: compiler error: wrong output directory, using standard output directory.');
                            } else {
                                outdir = outdir.substr(1) // /path/
                            }
                            if (!wrong) {
                                outdir = outdir.substr(1) // path/
                                if ('/' != outdir.slice(-1)) { // path => path/
                                    outdir += '/';
                                }
                            } else {
                                outdir = stdoutdir;
                            }
                        }
                    });
                    /**
                     * Makes an HTML <script> tag depending on blob parameter
                     * @param {string} blob Blob URL of a file that exists on local Windows 93 machine
                     * @returns {string} String with HTML script tag that haves blob parameter as src attribute and that haves 2 tabs (2*4=8 spaces) before the tag itself 
                     */
                    packages.toHTML = function(blob) {
                        var script = `        <script src="` + blob + `"></script>`
                        return script
                    }
                    packages.joinedTags = '        <!-- 4:no packages -->' // * 4 is some kind of error code, i use it for debugging
                    if (!packages.ignore) {
                        packages.list = []
                        packages.tags = []
                        $fs.utils.getFileMenu('/a/Py93/packages')["foldersList"].forEach((name) => {
                            if (name.endsWith('.brython.js')) {
                                $file.getUrl('/a/Py93/packages/'+name, function(blob) {
                                    packages.list.push(blob)
                                })
                            }
                        })
                    }
                    function compile() {
                        if (outConts == 'null') {
                            $log.red('py93compile: compiler error: file not found\nTrying to do what you tried to do again may solve this problem.');
                        } else if (outConts == null) {
                            $log.red('py93compile: compiler error: can\'t get file\nDebug information: 2, outConts is null\nTrying to do what you tried to do again may solve this problem.');
                        } else if (outConts == undefined) {
                            $log.red('py93compile: compiler error: can\'t get file\nDebug information: 3, outConts is undefined');
                        } else {
                            $log('Started compiling...');
                            var spl = outConts.split('\n');
                            var tabs = '            ';
                            var tabbed = [];
                            spl.forEach((element) => {
                                if (typeof(element) == 'string') {
                                    tabbed.push(tabs + element);
                                }
                            });
                            tabbedStr = tabbed.join('\n');
                            var date = new Date();
                            if (!packages.ignore) {
                                packages.list.forEach((blob) => {
                                    packages.tags.push(packages.toHTML(blob))
                                })
                                packages.joinedTags = packages.tags.join('\n')
                                if (packages.joinedTags == "") packages.joinedTags = '        <!-- 5:no packages -->'
                            }
                            var htmlfile = `<!-- \n    This HTML page was generated by Py93 compiler. \n    Generation date: ` + date.toString() + `\n--> \n<!DOCTYPE html> \n<html> \n    <head> \n        <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.8.8/brython.min.js"></script> \n        <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.8.8/brython_stdlib.js"></script> \n        <!-- packages --> \n${packages.joinedTags}\n        <!-- /packages --> \n        <script type="text/python3" id="r_Py93__script_first"> \n            # PLEASE DO NOT CHANGE OR DELETE THIS CODE. \n            import sys, browser \n            # Overwriting sys.stdout.write so stdout output will go to the textarea \n            class r_Py93__class_WriteStdout: \n                def __init__(self): \n                    self.console = browser.document["console"] \n                def write(self, text): \n                    self.console.text += text \n            sys.stdout = r_Py93__class_WriteStdout() \n            del r_Py93__class_WriteStdout \n            # Now overwriting sys.stderr, but the error messages will be outputed with browser.alert \n            class r_Py93__class_WriteStderr: \n                def __init__(self): \n                    pass \n                def write(self, text): \n                    browser.alert(text) \n            sys.stderr = r_Py93__class_WriteStderr() \n            del r_Py93__class_WriteStderr \n        </script> \n        <style> \n            textarea#console { \n                position: absolute; \n                width: 100%; \n                height: 100%; \n                resize: none; \n                top: 0px; \n                right: 0px; \n                left: 0px; \n                bottom: 0px; \n                background-color: #1d1d1d; \n                color: #ffffff; \n            } \n        </style> \n    </head> \n    <body onload="brython(1)"> \n        <textarea id="console" spellcheck="false" readonly></textarea> \n        <script type="text/python3" id="__main__"> \n` + tabbedStr + `\n        </script> \n    </body> \n</html>`;
                            var filename;
                            if (!(name == null)) {
                                filename = name + '.html';
                            } else {
                                filename = $fs.utils.getName(compFile);
                                filename = $fs.utils.replaceExt(filename, "html");
                            }
                            var compNameFin = outdir + filename;
                            //$log(compNameFin)
                            $db.set(compNameFin, htmlfile);
                            $log.green('Finished compilation.\nCompiled file path: /a/' + compNameFin + '\nWrite "$explorer.refresh();" to the terminal to make compiled file visible.'); // FIXME: Need to fix a bug when using $explorer.refresh() in the script does nothing
                        }
                    }
                    setTimeout(compile, 500);
                }
            }
        } else if (args[0] == "pm") {
            var args = this.arg.command.split(' ')
            var help = 'py93pm: usage:\npy93 pm [help or h]\n===========================================================\nhelp or h - print this help message';
            if (
                this.arg.command == "py93 pm" ||
                this.arg.command == "py93 pm " ||
                this.arg.command == "py93 pm help" ||
                this.arg.command == "py93 pm help " ||
                this.arg.command == "py93 pm h" ||
                this.arg.command == "py93 pm h "
            ) {
                $log(help)
            } else {
                if (args[1] == "add") {
                    var xhr = new XMLHttpRequest();
                    $log('Configuring request...')
                    xhr.open("GET", args[2], true)
                    xhr.timeout = 30000
                    xhr.ontimeout = function() {
                        $log('py93pm: error: request timed out')
                    }
                    xhr.onerror = function(e) {
                        $log.red('py93pm: request error: request failed, look for more info in the JavaScript console.')
                        console.error(new Error(`Request failed.\n${e}`))
                    }
                    xhr.onload = function() {
                        console.log(`py93pm: onload: ${xhr.status}, ${xhr.statusText}`);
                        if (xhr.status <= 299 && xhr.status >= 200) {
                            if (xhr.getResponseHeader("Content-Type").startsWith('application/json')) {
                                var success = true;
                                try {
                                    var respJSON = JSON.parse()
                                } catch (e) {
                                    success = false
                                    $log.red('py93pm: JSON error: failed to parse JSON, more info in the JavaScript console')
                                    new Error(e.stack) // we're not throwing the error, because there will be "Uncaught" at the start of error text
                                }
                                if (success) {
                                    /*
                                    if (typeof(respJSON.version) == "number") {
                                        if (respJSON.version > 1) {
                                            $log.red(`py93pm: version error: unsupported/unknown JSON package file syntax version: ${respJSON.version}`)
                                        } 
                                    } else {
                                        $log.red('py93pm: error: version in the JSON package file is not a number')
                                    }
                                    */

                                    /**
                                     * This object contains 8 booleans for validating package JSON file.
                                     * After validating, all booleans should be equal to true.
                                     */
                                    var checks = {
                                        versionExist: false, // True if "version" exist
                                        versionIsNum: false, // True if "version" is a number
                                        versionSupp: false, // True if package JSON file syntax (defined in "version") is supported by this version
                                        metaExist: false, // True if "meta" exist and typeof is "object"
                                        meta_titleExist: false, // True if "title" in "meta" exist
                                        meta_compVerExist: false, // True if "compVer" in "meta" exist
                                        installExist: false, // True if "install" exist and typeof is "object"
                                        install_packageExist: false // True if "package" in "install" exist and typeof is "string"
                                    }
                                    // Validating JSON
                                    if (typeof respJSON == "object") { // just double-checked to make absolutely sure, this if statement may be removed in future
                                        if (typeof respJSON.version != "undefined") checks.versionExist = true;
                                        if (typeof respJSON.version == "number") checks.versionIsNum = true;
                                        if ($py93.pm.supportedVers.includes(respJSON.version)) checks.versionSupp = true;
                                        if (typeof respJSON.meta != "undefined" && typeof respJSON.meta == "object") {
                                            checks.metaExist = true;
                                            if (typeof respJSON.meta.title != "undefined") checks.meta_titleExist = true;
                                            if (typeof respJSON.meta.compVer != "undefined") checks.meta_compVerExist = true;
                                        }
                                        if (typeof respJSON.install == "object") {
                                            checks.installExist = true;
                                            if (typeof respJSON.install.package != "undefined" || typeof respJSON.install.package == "string") checks.install_packageExist = true;
                                        }
                                        
                                        var checksNum = 0;
                                        for (check in checks) {
                                            if (check == true) checksNum += 1
                                        }

                                        if (checksNum == 8) {
                                            $log(`Package "${respJSON.meta.title}"\n===========================================================`)
                                            $log(`Title: ${respJSON.meta.title}`)
                                            if (typeof respJSON.meta.author != "undefined") $log(`Author: ${respJSON.meta.author}`)
                                            $log(`Version: ${(typeof respJSON.meta.dispVer) != "undefined" ? respJSON.meta.dispVer : respJSON.meta.compVer}`)
                                            if (typeof respJSON.meta.license != 'undefined') $log(`License: ${respJSON.meta.license}`)
                                            if (typeof respJSON.meta.packageSite != 'undefined') $log(`Package site/repository: ${respJSON.meta.packageSite}`)
                                            if (confirm(`You are going to install package "${respJSON.meta.title}". Are you sure?`)) {
                                                // yay, finally we installing it!
                                                $db.getRaw('Py93/pm/data.json', function(_a, file) {
                                                    try {
                                                        var pmData = JSON.parse(file)
                                                    } catch(e) {
                                                        console.error(new Error(e.stack));
                                                        $log.red(`py93pm: JSON error: failed to parse data.json in /a/Py93/pm/.\nError details:\n${e.stack}`)
                                                    }
                                                    if (typeof pmData == "object") {
                                                        pmData.installed.push(respJSON)
                                                        $db.set('Py93/pm/data.json', JSON.stringify(pmData))
                                                        $log('Installed the package.')
                                                    }
                                                })
                                            }
                                        } else {
                                            $log.red(`py93pm: error: ${8 - checksNum}/8 checks of JSON package file were not successful.\nLook for more info in the JavaScript console.`)
                                            console.error(new Error(`${8 - checksNum}/8 checks of JSON package file were not successful.`))
                                            if (checks.versionExist != true) console.log(new Error('Check "versionExist" was not successful.'))
                                            if (checks.versionIsNum != true) console.log(new Error('Check "versionIsNum" was not successful.'))
                                            if (checks.versionSupp != true) console.log(new Error('Check "versionSupp" was not successful.'))
                                            if (checks.metaExist != true) console.log(new Error('Check "metaExist" was not successful.'))
                                            if (checks.meta_titleExist != true) console.log(new Error('Check "meta_titleExist" was not successful.'))
                                            if (checks.meta_compVerExist != true) console.log(new Error('Check "meta_compVerExist" was not successful.'))
                                            if (checks.installExist != true) console.log(new Error('Check "installExist" was not successful.'))
                                            if (checks.install_packageExist != true) console.log(new Error('Check "install_packageExist" was not successful.'))
                                        }
                                    } else {
                                        new Error("respJSON is not object")
                                    }
                                }
                            } else {
                                $log.red(`py93pm: error: response header "Content-Type" value should start with "application/json", but "Content-Type" value is ${xhr.getResponseHeader('Content-Type')}`)
                            }
                        } else {
                            $log.red(`py93pm: HTTP error: ${xhr.status} ${xhr.statusText}`)
                        }
                    }
                    xhr.send()
                    $log('Sended the request, now awaiting response. This can take up to 30 seconds.')
                }
            }
        } else {
            $log($py93.help);
        }
    },
    hascli: true,
    terminal: true
};
console.log('[Py93Helper] Finished execution.');
