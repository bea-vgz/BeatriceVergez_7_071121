<template>
    <div class="loader" v-if="isLoading">
        <svg class="circle">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"/>
            <circle class="path2" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"/>
            <circle class="path3" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"/>
            <circle class="path4" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"/>
        </svg>
    </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  data() {
    return {
      isLoading: false,
    }
  },
}
</script>

<style lang="scss" scoped>
$black: #f04f44;
$pink: #fc8282e1;
$red: #d62d20;
$yellow: #ffc895e0;
$white: #eee;

$animDuration: 2s;

$width: 100px;
$zoom: 1.7;

body {
  background-color: $white;
}

.loader {
  position: relative;
  margin: 0px auto;
  width: $width;
  height: $width;
  zoom: $zoom;
}

.circle {
 animation: spin $animDuration linear infinite;
 height: $width;
 position: relative;
 width: $width;
}


.path {
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
  animation: 
   dash 1.5s ease-in-out infinite
  ;
  stroke: $yellow;
  stroke-linecap: round;
}

.path2 {
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
  animation: 
   dash2 1.5s ease-in-out infinite
  ;
  stroke: $pink;
  stroke-linecap: round;
}

.path3 {
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
  animation: 
   dash3 1.5s ease-in-out infinite
  ;
  stroke: $black;
  stroke-linecap: round;
}

.path4 {
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
  animation: 
   dash4 1.5s ease-in-out infinite
  ;
  stroke: $red;
  stroke-linecap: round;
}

@keyframes spin{
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes dash{
 0%{
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
 }
 50%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -35;
 }
 100%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -124;
 }
}

@keyframes dash2{
 0%{
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
 }
 50%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -50;
 }
 100%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -124;
 }
}

@keyframes dash3{
 0%{
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
 }
 50%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -75;
 }
 100%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -124;
 }
}
@keyframes dash4{
 0%{
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
 }
 50%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -100;
 }
 100%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -124;
 }
}
@keyframes color{
  100%, 0%{
    stroke: $red;
  }
  40%{
    stroke: $pink;
  }
  66%{
    stroke: $black;
  }
  80%, 90%{
    stroke: $yellow;
  }
}
</style>