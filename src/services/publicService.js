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

  async articles() {
    const { data } = await api.get('/public/articles/');
    return data;
  },

  // ============ REGISTRATION ============
  /**
   * Submit a new member registration.
   * @param {Object} payload — plain object with all fields
   * @param {File|null} photoFile — optional image File
   * @returns {Promise<Object>} the created MembershipRegistration status object
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

  async registrationStatus(id) {
    const { data } = await api.get(`/public/register/${id}/status/`);
    return data;
  },

  // ============ CONTACT (stub — wire later) ============
  async contact(payload) {
    // Wire this to a real /api/public/contact/ endpoint when ready.
    // For now, log and resolve so the UI doesn't break.
    // eslint-disable-next-line no-console
    console.info('[contact] payload:', payload);
    return { ok: true };
  },
};

export default publicService;