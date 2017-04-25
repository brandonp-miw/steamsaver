const {Tray, Menu} = require('electron');
const path = require('path');

class SystemTray {

	constructor(){
		this._icon = null;
		this.server = null;
	}

	initialize(win, appIcon, server){

	  this.server = server;

      const iconPath = path.join(__dirname, '../assets/icon.png');
	  appIcon = this.icon = new Tray(iconPath);

	  const contextMenu = Menu.buildFromTemplate([
	    {
	      label: 'Settings',
	      submenu: [
	        { 
	          label: 'Manage Directories',
	          click: () => {
	            win.show();
	          }
	        }
	      ]
	    },
	    {
	      label: 'Server',
	      submenu: [
	         {
	            label: "Toggle",
	            click: () => {
	                this.server.running ? this.server.stop() : this.server.start()
	            }
	         }
	      ]
	    },
	    {
	      label: 'Options',
	      submenu: [
	         {
	          label: 'Developer Tools',
	          click: () => {
	            win.show();
	            win.toggleDevTools();
	          }
	        }
	      ]
	    },
	    { 
	      label: 'Quit',
	      selector: 'terminate:',
	    }
	  ]);
	  appIcon.setToolTip(`Steam Saver`);
	  appIcon.setContextMenu(contextMenu);

	}

	get icon(){
		return this._icon;
	}

	set icon(icon){
		this._icon = icon;
	}

}

module.exports = SystemTray;