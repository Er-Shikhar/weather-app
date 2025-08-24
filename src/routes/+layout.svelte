<script>
  import "../app.css";
  import { goto } from "$app/navigation";
  let city = "";

  function search() {
    goto(`/forcastDetails?city=${city}`);
  }
</script>

<div class="container">
  <div class="searchContainer glassCard">
    <input
      type="text"
      class="inputCity"
      bind:value={city}
      placeholder="Search for a city..."
    />
    <button on:click={search} class="searchButton">🔍</button>
  </div>
</div>
<slot />

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100vw;
  }

  .searchContainer {
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
  }

  .inputCity {
    flex: 1;
    border: none;
    color: white;
    padding: 10px;
    font-size: 1rem;
    width: 400px;
    background: transparent;
  }
  .inputCity {
    flex: 1;
    border: none;
    padding: 10px;
    font-size: 1rem;
    width: 400px;
    background: transparent;
  }

  .searchButton {
    padding: 10px;
    border-radius: 50px;
    font-size: 1rem;
    color: white;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }

  .searchButton:hover {
    background-color: #79797946;
  }

  .glassCard {
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.092);
    color: rgb(255, 255, 255);
    box-shadow: 0px 0px 10px 5px rgba(96, 96, 96, 0.837);
  }
  @media (max-width: 768px) {
    .container {
      position: relative;
    }
    .searchContainer {
      flex-direction: row;
      gap: 15px;
    }

    .inputCity {
      width: 100%;
    }

    .searchButton {
      border-radius: 25px;
    }
  }
</style>
