<template>
  <Head>
    <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Heebo" />
    <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Metrophobic" />
    <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Droid+Serif" />
    <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  </Head>
  <NuxtLayout :name="'default'">
    <div class="">
      <Journey />
      <Journey />
      <Journey />
      <Journey />
      <Journey />
  </div>
  </NuxtLayout>
</template>
<style>
  :root {
    --brown: #502419;
    --asparagus: #7EA172;
    --khaki: #C7CB85;
    --fawn: #E7A977;
    --peach: #EBBE9B;
    --phtalo: #14342B;
  }

  .font-heebo {
    font-family: Heebo;
  }
  
  .font-droid {
    font-family: 'Droid Serif';
    font-weight: 300;
  }
  
  .font-metrophobic {
    font-family: Metrophobic;
    font-weight: light;
  }

  body {
    font-family: Metrophobic;
  }

  .font-oblique {
    font-style: oblique;
  }
</style>
