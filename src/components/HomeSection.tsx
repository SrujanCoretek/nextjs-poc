import React from 'react';
import { SECTION_WRAPPER } from '../styles/theme';
import { MarketItem } from '../types/state.type';

interface Props {
  title: string;
  data: MarketItem[];
}

export default function HomeSection({ title }: Props) {
  return (
    <div className={SECTION_WRAPPER}>
      <div className="container mx-auto px-3 md:px-0">
        <div className="relative">
          <h2 className="HEADING">{title}</h2>
          {/* <Carousal items={data} isLoading={false} openItem={true} /> */}
        </div>
      </div>
    </div>
  );
}
