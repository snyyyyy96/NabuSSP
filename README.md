![image](https://github.com/snyyyyy96/NabuSSP/blob/master/review.png)

## Introduction

Step1  Run 'npm install'

Step2  Copy 'src/usa.js' into 'node_modules/echarts/map/js'

Step3  For development, run 'npm run dev' 
       Build for test environment, run 'npm run build:stage'  
       Build for production environment, run 'npm run build:prod' 
       
Step4  In production environment, you will see a new folder 'dist'. Click dist/index.html



## file used

|-src
|    |-views
|    |    -dashboard
|    |        -admin
|    |            -components
|    |                -PanelGroup.vue (Home screen)
|    |
|    |-layout
|    |    -components
|    |        -Navbar.vue (navbar)
|    |        -Dashboard.vue 
|    |        -Aus.vue (secondary page)
|    |        -Las.vue (secondary page)
|    |        -Otw.vue (secondary page)
|    |        -Sjc.vue (secondary page)
|    |        -RecentEvents.vue
|    |        -Usamap.vue (embeded map on dashboard)
|    | 
|    |-assets
|    |    -images (logo, background and floor plans)
|    |
|    |-api
|    |    -panelgroup.js (post and request api)
|    |    -user.js & role.js (for different roles login, we don't need them for this stage)
|    |
|    |-permission.js (for login, we don't need them for this stage)
|
|-mock
|     -panelgroup (all the mock data for the)
    
