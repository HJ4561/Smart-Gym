// src/services/publicService.js
import api from './api';

export const publicService = {
  // ============ CATALOG ============
  async plans() {
    const { data } = await api.get('/public/plans/');
    return data;
  },

  async courses(params = {}) {
    const { data } = await api.get('/public/courses/', { params });
    return data;
  },

  async facilities() {
    const { data } = await api.get('/public/facilities/');
    return data;
  },

  async trainers(params = {}) {
    const { data } = await api.get('/public/trainers/', { params });
    return data;
  },

  async nutritionists() {
    const { data } = await api.get('/nutrition/nutritionists/', { params: { accepting: 'true' } });
    return data;
  },

  async articles() {
    const { data } = await api.get('/public/articles/');
    return data;
  },

  /** Real numbers for the home page: who's in now, today's classes, reviews… (cached 1 min server-side). */
  async live() {
    const { data } = await api.get('/public/live/');
    return data;
  },

  // ============ REGISTRATION ============
  /**
   * Submit a new member registration.
   * @param {Object} payload — plain object with all fields
   * @param {File} photoFile — live camera capture (required by the backend)
   * @returns {Promise<Object>} { id, status, payment_status, payment: <Moyasar form params> }
   */
  async register(payload, photoFile = null) {
    const form = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      form.append(key, value);
    });

    if (photoFile) form.append('photo', photoFile);

    const { data } = await api.post('/public/register/', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  /** Does a captured photo show one clear face? Throws with .code / .fields.photo when refused. */
  async checkPhoto(photoFile) {
    const form = new FormData();
    form.append('photo', photoFile);
    const { data } = await api.post('/public/photo-check/', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async registrationStatus(id) {
    const { data } = await api.get(`/public/register/${id}/status/`);
    return data;
  },

  // ============ PAYMENT (Moyasar) ============
  /** Link a just-created Moyasar payment to its registration (from the form's on_completed). */
  async attachPayment(registrationId, paymentId) {
    const { data } = await api.post(`/public/register/${registrationId}/payment/attach/`, {
      payment_id: paymentId,
    });
    return data;
  },

  /** Ask the backend to verify a payment with Moyasar. Returns { id, status, payment_status, payment_failure_reason }. */
  async verifyPayment(paymentId) {
    const { data } = await api.post('/public/payments/moyasar/verify/', { payment_id: paymentId });
    return data;
  },

  // ============ SITE CONTENT (admin-managed) ============
  /** Every text { key: {en, ar} } and image { key: {url, alt_en, alt_ar} } of the site. */
  async siteContent() {
    const { data } = await api.get('/public/site-content/');
    return data;
  },

  /** Admin-managed list, e.g. 'facilities' or 'articles' (visible items, display order). */
  async collection(name) {
    const { data } = await api.get(`/public/collections/${name}/`);
    return data;
  },

  /** One list item by slug, with its full data (article page). */
  async collectionItem(name, slug) {
    const { data } = await api.get(`/public/collections/${name}/${encodeURIComponent(slug)}/`);
    return data;
  },

  // ============ CONTACT ============
  /** POST the contact form → admin portal's Website Inbox. */
  async contact(payload) {
    const { data } = await api.post('/public/contact/', payload);
    return data;
  },
};

export default publicService;