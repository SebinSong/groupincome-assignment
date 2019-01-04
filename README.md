# groupincome-assignment

> groupincome assignment

## Build Setup

install dependencies : npm install
serve with hot reload at localhost:8080 : npm run dev
build for production with minification : npm run build

<Project Note>
  
- The project was created using Vue.js(Vue-CLI version 2.x.x) and SASS.

- The working directory is 'src' folder which contains all the .vue, .js and .scss files used.

- 'Font-Awesome' and 'Source Sans Pro' font are loaded via each CDN.

- SVG files provided as project assets are not included in the '/dist' folder because their internal source codes are taken and written as part of the html source code, rather than being used as image files. That way, I thought, we don't have to carry around or download the files.

- Animations going on are created using SVG and Javascript. The mainpage animation was inspired by this video(
https://vimeo.com/140036858 around 15second).

- No external library is being used.



- Project Source-code Structure.

![projectcomponentree](https://user-images.githubusercontent.com/17641213/50673511-8dc56580-1021-11e9-8124-16e57dd2f822.jpg)

I thought the core concept to get the required tasks done was using a 'global storage' where each component, regardless of where they are located in the component tree structure, can directly access a needed data. This could be achieved by serveral methods(ex. Javascript session storage etc.) and is particularly what 'Vuex' is designed for. But I thought downloading and installing the whole Vuex package for just a couple of variables wasn't ideal. So I decided to use the simple way that Vue.js documentation details in their website( https://vuejs.org/v2/guide/state-management.html#ad )


Thank you for reading.

