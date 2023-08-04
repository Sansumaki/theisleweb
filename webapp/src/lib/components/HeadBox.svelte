<script lang="ts">
    export let background: string;
</script>

<div class="box head"
     style="background: radial-gradient(circle, transparent 40%, transparent 75%),linear-gradient(to right, grey, grey),url('{background}');">
    <h1><slot /></h1>
    <h3><slot name="subtitle" /></h3>
</div>

<style>
    div {
        background-blend-mode: multiply !important;
        background-position: center !important;
        text-transform: uppercase;
    }
    div > * {
        text-align: center;
    }
</style>