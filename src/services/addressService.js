import { supabase } from '../lib/supabase';

export const addressService = {
  /**
   * Fetch all saved addresses for a specific user
   */
  async getAddresses(userId) {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Save a new address or update an existing one
   */
  async saveAddress(addressData) {
    const { data, error } = await supabase
      .from('addresses')
      .upsert(addressData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a saved address
   */
  async deleteAddress(addressId) {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId);

    if (error) throw error;
    return true;
  },
};
