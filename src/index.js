'use strict';

const path = require('path');

/**
 * resource spa check
 * @param  {}            
 * @return {}     []
 */
module.exports = class extends think.middleware.base {
  /**
   * run
   * @return {Promise} []
   */
  run () {
    /**
     * pathname:
     * when it's root, the value is '/'
     * when it's another, such as 'static/home' or 'static/home/', the value is 'static/home'
     */
    let pathname = this.http.pathname;

    // when there is no pathname or the config about 'resource-on' is turn off, retrun null to ignore
    if (!this.config('resource_on') || !pathname || pathname === '/') {
      return null;
    }

    // pathname maybe not valid, then throw an `URI malformed` error
    try {
      pathname = decodeURIComponent(pathname).replace(/\\/g, '/');
    } catch (e) {
      return null;
    }

    pathname = path.normalize(pathname);
    // replace \ to / on windows
    pathname = pathname.replace(/\\/g, '/');

    /**
     * check whether it is in SPA configuration
     */
    let spaReg = this.config('resource_spa');
    let pathnameTmp = pathname + '/'; // add '/' to prevent the path match the part, like 'app/home' is matched by 'app/home2'
    let file = path.normalize(`${think.RESOURCE_PATH}/${pathname}`);

    if(file.indexOf(think.RESOURCE_PATH) !== 0){
      return null;
    }
    if(!think.isArray(spaReg)) { // turn is to array
      spaReg = [spaReg+''];
    }

    let foundReg;
    for (let i = 0; i < spaReg.length; i++) {
      let currentReg = new RegExp(spaReg[i]);
      if( currentReg.test(pathnameTmp) ) { // find the right SPA config and save it.
        foundReg = currentReg;
        break;
      }
    }
    if(foundReg) { // if it is SPA, deal with it，return a file or the index. if index is not found, return true like the official handle way
      if(!think.isFile(file)) {
        pathname = pathnameTmp.match(foundReg)[0] + '/index.html'
        file = path.normalize(`${think.RESOURCE_PATH}/${pathname}`);
      }

      if (think.isFile(file)) {
        let cors = this.config('resource_cors');
        if(cors){
          this.http.header('Access-Control-Allow-Origin', typeof cors === 'string' ? cors : '*');
        }
        return file;
      }

      return true;
    }

    // then check if it is static resource
    let reg = this.config('resource_reg');
    if (!reg.test(pathname)) {
      return null;
    }
    
    //resource exist
    if (think.isFile(file)) {
      let cors = this.config('resource_cors');
      if (cors) {
        this.http.header('Access-Control-Allow-Origin', typeof cors === 'string' ? cors : '*');
      }
      return file;
    } else {
      return true;
    }
  }
}