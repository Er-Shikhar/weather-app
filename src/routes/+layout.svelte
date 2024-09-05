<script>
  import "../app.css";
  import { goto } from "$app/navigation";
  let city = "";

  function search() {
    goto(`/forcastDetails?city=${city}`);
    console.log("searched ", city);
  }
</script>

<div class="headerContainer">
  <div class="searchContainer">
    <input
      type="text"
      class="inputCity glassCard"
      bind:value={city}
      placeholder="Search for a city..."
    />
    <button on:click={search} class="searchButton glassCard">🔍</button>
  </div>
</div>
<slot />

<style>
  .headerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: black; */
    padding: 20px;
    width: 100%;
  }

  .searchContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: calc(100% - 50px);
    max-width: 500px;
  }

  .inputCity {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    border-radius: 25px;
    /* border: 2px solid #ccc; */
    width: calc(100% - 50px); /* Adjust width relative to the button */
  }

  .searchButton {
    padding: 10px;
    width: 45px;
    height: 45px;
    font-size: 1rem;
    background-color: #ffffff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .searchButton:hover {
    background-color: #005fa3;
  }

  .glassCard {
    backdrop-filter:blur(3px);
    background-color: rgba(0, 0, 0, 0.092);
    color: white;
    box-shadow: 0px 0px 10px 5px rgba(96, 96, 96, 0.837);
  }
  @media (max-width: 768px) {
    .headerContainer {
    position:relative;
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
