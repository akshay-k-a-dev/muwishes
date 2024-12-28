<script lang="ts">
  import { onMount } from 'svelte';
  export let width: number = window.innerWidth;
  export let height: number = window.innerHeight;

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  });
</script>

<canvas
  bind:this={canvas}
  {width}
  {height}
  style="position: fixed; top: 0; left: 0; pointer-events: none; z-index: 1;"
/>