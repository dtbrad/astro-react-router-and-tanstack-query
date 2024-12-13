<script>
  export let contacts = [];
  let searchTerm = '';

  $: filteredContacts = searchTerm.trim() 
    ? contacts.filter(contact => 
        `${contact.first} ${contact.last}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : contacts;
</script>

<div class="contacts-app">
  <input
    type="text"
    placeholder="Filter contacts..."
    bind:value={searchTerm}
  />

  <ul>
    {#each filteredContacts as contact}
      <li>
        {contact.first} {contact.last}
      </li>
    {/each}
  </ul>
</div>

<style>
  .contacts-app {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
    max-width: 300px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem 0;
  }
</style>