const { default: axios } = require('axios');
const fetch = require('node-fetch');

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0Njk5NjEzLCJpYXQiOjE3NDQ2OTkzMTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNkOTRlMmY5LWUwYzAtNGQ3Zi04ZGQzLWFlMDkzODhlNWMxNSIsInN1YiI6InJha3NoaXRhMjEzNi5iZTIyQGNoaXRrYXJhLmVkdS5pbiJ9LCJlbWFpbCI6InJha3NoaXRhMjEzNi5iZTIyQGNoaXRrYXJhLmVkdS5pbiIsIm5hbWUiOiJyYWtzaGl0YSIsInJvbGxObyI6IjIyMTA5OTIxMzYiLCJhY2Nlc3NDb2RlIjoiUHd6dWZHIiwiY2xpZW50SUQiOiJjZDk0ZTJmOS1lMGMwLTRkN2YtOGRkMy1hZTA5Mzg4ZTVjMTUiLCJjbGllbnRTZWNyZXQiOiJrdWt0UFFyTk56a3duYW55In0.KT3Fymztkcfzk10cnzkNTSDz4kZ1ZwEM9Qz4Uc6edBc';

module.exports = async function fetchWithTimeout(url, options = {}, timeout = 500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response;
  } catch (error) {
    console.log('❌ Error fetching:', url, error.message);
    return null;
  } finally {
    clearTimeout(id);
  }
};