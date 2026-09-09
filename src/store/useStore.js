import { create } from 'zustand';

export const useStore = create((set) => ({
  journeyProgress: 0,
  activeScene: 0,
  isPinned: true,
  activeModal: null, // null | 'locations' | 'partner' | 'careers' | 'contact' | 'offerings' | 'about'
  selectedPartnerCategory: null,
  selectedOffering: null,
  mobileMenuOpen: false,

  setJourneyProgress: (progress) => {
    // Map progress (0 to 1) to approximate scenes (0 to 16)
    const scene = Math.min(16, Math.floor(progress * 17));
    set({ journeyProgress: progress, activeScene: scene });
  },

  setIsPinned: (isPinned) => set({ isPinned }),
  
  openModal: (modalId, extra = {}) => set({ 
    activeModal: modalId, 
    ...extra,
    mobileMenuOpen: false 
  }),
  
  closeModal: () => set({ 
    activeModal: null, 
    selectedPartnerCategory: null,
    selectedOffering: null 
  }),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open })
}));
