<script lang="ts">
  import { player } from "../modules/personagens.svelte";
  
</script>

<div class="bar">
  <div
    class="lifebar"
    style="width: {player.vida}%; height: 100%; background-color: green"
  >
    <p>{player.vida}%</p>
  </div>
</div>

<style>
  .bar {
    position: fixed;
    top: 20px;
    left: 20px;
    border: 1px solid #fff;
    box-shadow:
      2px 0 0 #fff,
      -2px 0 0 #fff,
      0 2px 0 #fff,
      0 -2px 0 #fff;

    z-index: 999999;
    margin: 0;
    width: 120px;
    height: 20px;
    background-color: grey;
    color: white;
  }
  .lifebar {
    padding-top: 4px;
    padding-left: 5px;
    font-size: small;

    transition: all 0.8s ease-in-out;
  }
</style>
