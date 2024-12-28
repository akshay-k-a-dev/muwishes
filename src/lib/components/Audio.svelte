<script lang="ts">
  import { onMount } from 'svelte';
  
  export let src: string;
  export let autoplay: boolean = false;
  
  let audio: HTMLAudioElement;
  
  export function play() {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
  
  onMount(() => {
    if (autoplay && audio) {
      audio.play();
    }
  });
</script>

<audio bind:this={audio} {src} preload="auto" />