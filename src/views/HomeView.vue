<script setup>
</script>

<template>
  <main>
    <div class="row">
      <div class="leftcolumn">
        <div class="card">
          <h2>TITLE HEADING</h2>
          <h3>Title description, Dec 7, 2017</h3>
          <div class="fakeimg" style="height:200px;">Image</div>
          <p>Some text..</p>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

/* Add a card effect for articles */
.card {
  background-color: #333;
  padding: 20px;
  margin-top: 20px;
}

/* Fake image */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

.card h2 {
  color: #f2f2f2;
}

.card p {
  color: #f2f2f2;
}

.card h3 {
  color: #f2f2f2;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {
    width: 100%;
    padding: 0;
  }
}

</style>
