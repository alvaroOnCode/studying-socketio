<template>
  <div>
    <canvas ref="game" width="640" height="480"></canvas>

    <br />

    <button @click="move('left')">Left</button>
    <button @click="move('right')">Right</button>
    <button @click="move('up')">Up</button>
    <button @click="move('down')">Down</button>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "BlockGame",
  data: () => ({
    socket: {},
    context: {},
    position: {
      x: 0,
      y: 0
    }
  }),
  methods: {
    move(direction) {
      this.socket.emit("move", direction);
    }
  },
  created() {
    console.log(`Socket connected to http://localhost:${process.env.VUE_APP_SERVER_PORT}`);
    this.socket = io(`http://localhost:${process.env.VUE_APP_SERVER_PORT}`);
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("position", data => {
      this.position = data;
      this.context.clearRect(
        0,
        0,
        this.$refs.game.width,
        this.$refs.game.height
      );
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
