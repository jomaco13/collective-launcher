export namespace launcher {
	
	export class Download {
	    url: string;
	    sha256?: string;
	    format?: string;
	
	    static createFrom(source: any = {}) {
	        return new Download(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.sha256 = source["sha256"];
	        this.format = source["format"];
	    }
	}
	export class AppEntry {
	    id: string;
	    name: string;
	    description: string;
	    version: string;
	    icon?: string;
	    binary?: string;
	    service?: string;
	    dashboard?: string;
	    ou?: string;
	    downloads?: Record<string, Download>;
	    download_url?: string;
	    github_owner?: string;
	    github_repo?: string;
	    asset_pattern?: string;
	
	    static createFrom(source: any = {}) {
	        return new AppEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.version = source["version"];
	        this.icon = source["icon"];
	        this.binary = source["binary"];
	        this.service = source["service"];
	        this.dashboard = source["dashboard"];
	        this.ou = source["ou"];
	        this.downloads = this.convertValues(source["downloads"], Download, true);
	        this.download_url = source["download_url"];
	        this.github_owner = source["github_owner"];
	        this.github_repo = source["github_repo"];
	        this.asset_pattern = source["asset_pattern"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class InstalledApp {
	    id: string;
	    version: string;
	    path: string;
	    binary: string;
	    installed: number;
	    sha256?: string;
	
	    static createFrom(source: any = {}) {
	        return new InstalledApp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.version = source["version"];
	        this.path = source["path"];
	        this.binary = source["binary"];
	        this.installed = source["installed"];
	        this.sha256 = source["sha256"];
	    }
	}

}

