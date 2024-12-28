<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { MessageForm } from './types';

  const dispatch = createEventDispatcher<{
    submit: MessageForm;
  }>();

  let form: MessageForm = {
    senderName: '',
    recipientName: '',
    relationship: 'family'
  };

  const relationships = [
    { value: 'family', label: 'Family' },
    { value: 'friend', label: 'Friend' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'partner', label: 'Partner' },
    { value: 'other', label: 'Other' }
  ];

  function handleSubmit() {
    dispatch('submit', form);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="message-form card">
  <div class="form-group">
    <label for="senderName">Your Name</label>
    <input
      type="text"
      id="senderName"
      bind:value={form.senderName}
      maxlength="50"
      required
      placeholder="Enter your name"
    />
  </div>

  <div class="form-group">
    <label for="recipientName">Recipient's Name</label>
    <input
      type="text"
      id="recipientName"
      bind:value={form.recipientName}
      maxlength="50"
      required
      placeholder="Enter recipient's name"
    />
  </div>

  <div class="form-group">
    <label for="relationship">Relationship</label>
    <select id="relationship" bind:value={form.relationship}>
      {#each relationships as rel}
        <option value={rel.value}>{rel.label}</option>
      {/each}
    </select>
  </div>

  <button type="submit" class="submit-btn">Generate Message</button>
</form>

<style>
.message-form {
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid var(--christmas-gold);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--christmas-gold);
  font-size: 1.1rem;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid var(--christmas-gold);
  border-radius: 10px;
  font-size: 1rem;
  color: var(--christmas-green);
  height: auto;
  box-sizing: border-box;
}

input::placeholder {
  color: rgba(22, 91, 51, 0.6);
}

input:focus, select:focus {
  outline: none;
  border-color: var(--christmas-red);
  box-shadow: 0 0 0 3px rgba(212, 36, 38, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  font-size: 1.1rem;
}

@media (min-width: 768px) {
  .message-form {
    padding: 3rem;
  }

  input, select {
    font-size: 1.1rem;
    padding: 1rem;
  }

  .submit-btn {
    padding: 1rem;
    font-size: 1.2rem;
  }
}
</style>