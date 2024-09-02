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
      class="inputCity"
      bind:value={city}
      placeholder="Search for a city..."
    />
    <button on:click={search} class="searchButton">🔍</button>
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
    width: 100%;
    max-width: 500px;
  }

  .inputCity {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    border-radius: 25px;
    border: 2px solid #ccc;
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

  @media (max-width: 768px) {
    .searchContainer {
      flex-direction: column;
      gap: 15px;
    }

    .inputCity {
      width: 100%;
    }

    .searchButton {
      width: 100%;
      border-radius: 25px;
    }
  }
</style>
