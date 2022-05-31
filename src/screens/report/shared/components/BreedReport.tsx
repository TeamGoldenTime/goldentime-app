import React, { Dispatch, useState } from 'react';
import { Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'tailwind-rn';

import { BREED_LIST } from '../constants';

interface BreedReportProps {
  kind: string;
  setKind: Dispatch<any>;
}

const BreedReport: React.FC<BreedReportProps> = ({ kind, setKind }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(BREED_LIST);

  return (
    <>
      <Text style={tw('mt-3 text-base text-gray-600')}>품종</Text>
      <DropDownPicker
        open={open}
        value={kind}
        items={items}
        setOpen={setOpen}
        setValue={setKind}
        setItems={setItems}
        listMode="SCROLLVIEW"
        style={{
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#737373',
          borderRadius: 0,
        }}
        labelStyle={[{ left: -10 }, tw('text-lg')]}
        placeholder=""
        searchPlaceholder="품종 검색"
        searchable={true}
      />
    </>
  );
};

export default BreedReport;
