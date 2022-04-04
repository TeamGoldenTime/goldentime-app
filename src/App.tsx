import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ReportModal from './modal/report';

import MainNavigation from './navigations/MainNavigation';

const App = () => {
  const [showReportModal, setShowReportModal] = useState(false); // TODO: 전역 상태로 변경

  return (
    <NavigationContainer>
      <ReportModal
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
      />
      <MainNavigation setShowReportModal={setShowReportModal} />
    </NavigationContainer>
  );
};

export default App;
