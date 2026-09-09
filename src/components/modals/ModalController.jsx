import React from 'react';
import { useStore } from '../../store/useStore';
import { LocationsModal } from './LocationsModal';
import { PartnerModal } from './PartnerModal';
import { CareersModal } from './CareersModal';
import { ContactModal } from './ContactModal';
import { OfferingsModal } from './OfferingsModal';
import { AboutModal } from './AboutModal';

export function ModalController() {
  const activeModal = useStore((state) => state.activeModal);

  if (!activeModal) return null;

  switch (activeModal) {
    case 'locations':
      return <LocationsModal />;
    case 'partner':
      return <PartnerModal />;
    case 'careers':
      return <CareersModal />;
    case 'contact':
      return <ContactModal />;
    case 'offerings':
    case 'experience':
      return <OfferingsModal />;
    case 'about':
    case 'expansion':
      return <AboutModal />;
    default:
      return null;
  }
}
