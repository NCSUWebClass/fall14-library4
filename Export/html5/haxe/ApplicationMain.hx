import Main;
import lime.Assets;


class ApplicationMain {
	
	
	public static var config:lime.app.Config;
	public static var preloader:lime.app.Preloader;
	
	private static var app:lime.app.Application;
	
	
	public static function create ():Void {
		
		preloader = new lime.app.Preloader ();
		preloader.onComplete = start;
		preloader.create (config);
		
		#if js
		var urls = [];
		var types = [];
		
		
		
		preloader.load (urls, types);
		#end
		
	}
	
	
	public static function main () {
		
		config = {
			
			antialiasing: Std.int (0),
			background: Std.int (16777215),
			borderless: false,
			depthBuffer: false,
			fps: Std.int (0),
			fullscreen: false,
			height: Std.int (0),
			orientation: "",
			resizable: true,
			stencilBuffer: false,
			title: "WebGL Fluid Experiment",
			vsync: true,
			width: Std.int (0),
			
		}
		
		#if js
		#if munit
		embed (null, 0, 0, "FFFFFF");
		#end
		#else
		create ();
		#end
		
	}
	
	
	public static function start ():Void {
		
		app = new Main ();
		app.create (config);
		
		var result = app.exec ();
		
		#if sys
		Sys.exit (result);
		#end
		
	}
	
	
	#if neko
	@:noCompletion public static function __init__ () {
		
		var loader = new neko.vm.Loader (untyped $loader);
		loader.addPath (haxe.io.Path.directory (Sys.executablePath ()));
		loader.addPath ("./");
		loader.addPath ("@executable_path/");
		
	}
	#end
	
	
}