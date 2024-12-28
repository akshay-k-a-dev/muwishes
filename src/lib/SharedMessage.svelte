<script lang="ts">
import { onMount } from 'svelte';
import { messageService } from './services/firebase';
import type { GeneratedMessage } from './types';
import Fireworks from './Fireworks.svelte';

export let messageId: string;
let message: GeneratedMessage | null = null;
let loading = true;
let error: string | null = null;

onMount(async () => {
  try {
    const fetchedMessage = await messageService.get(messageId);
    if (fetchedMessage) {
      message = fetchedMessage;
    } else {
      error = "Message not found";
    }
  } catch (e) {
    error = "Failed to load message";
    console.error(e);
  } finally {
    loading = false;
  }
});
</script>

<div class="shared-message">
  <Fireworks />
  
  {#if loading}
    <div class="loading">Loading message...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else if message}
    <div class="message-card">
      <h1>Holiday Wishes</h1>
      <div class="message-content">
        <p class="message">{message.content}</p>
        <p class="signature">From: {message.form.senderName}</p>
        <p class="recipient">To: {message.form.recipientName}</p>
      </div>
    </div>
  {/if}
</div>

<style>
.shared-message {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-card {
  background: rgba(22, 91, 51, 0.9);
  border: 3px solid var(--christmas-gold);
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  max-width: 600px;
  margin: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

h1 {
  color: var(--christmas-gold);
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.message-content {
  color: var(--christmas-white);
}

.message {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.signature, .recipient {
  color: var(--christmas-gold);
  font-style: italic;
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: var(--christmas-white);
  font-size: 1.2rem;
}

.error {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .message-card {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>