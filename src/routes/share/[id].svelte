<script lang="ts">
import { onMount } from 'svelte';
import { getMessage } from '../../lib/services/firebase';
import type { GeneratedMessage } from '../../lib/types';
import Fireworks from '../../lib/Fireworks.svelte';

export let id: string;
let message: GeneratedMessage | null = null;
let loading = true;
let error = false;

onMount(async () => {
  try {
    message = await getMessage(id);
    loading = false;
  } catch (e) {
    error = true;
    loading = false;
  }
});
</script>

{#if loading}
  <div class="loading">Loading message...</div>
{:else if error}
  <div class="error">Failed to load message</div>
{:else if message}
  <div class="share-card">
    <Fireworks />
    <div class="card-content">
      <h1>Holiday Wishes</h1>
      <p class="message">{message.content}</p>
      <p class="signature">From: {message.form.senderName}</p>
      <p class="to">To: {message.form.recipientName}</p>
    </div>
  </div>
{/if}

<style>
.share-card {
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.card-content {
  background: rgba(22, 91, 51, 0.8);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
  margin: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #E8C84E;
  margin-bottom: 1.5rem;
}

.message {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.signature, .to {
  font-style: italic;
  color: #E8C84E;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: white;
}

.error {
  color: #ff6b6b;
}
</style>