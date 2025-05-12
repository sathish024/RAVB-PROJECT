import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LanguageProvider } from "./LanguageContext"; 
import SelectionPage from "./SelectionPage";
import UserScreen from "./UserDetailsScreen";
import MechanicScreen from "./MechanicScreen";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import UserHome from "./UserHome";
import AssistanceScreen from "./AssistanceScreen";
import TroubleshootingSteps from "./troubleshootingSteps";
import AssitanceListScreen from "./AssitanceListScreen";
import AssistanceDetailsScreen from "./AssistanceDetailsScreen";
import ProfileScreen from "./ProfileScreen";
import TimeoutScreen from "./TimeoutScreen";
import PaymentScreen from "./PaymentScreen";
import PaymentProceed from "./PaymentProceed";
import LiveMechanicTracking from "./LiveMechanicTracking";
import ChatScreen from "./ChatScreen";
import MechanicHome from "./MechanicHome";
import ActivationPage from "./ActivationPage";
import RequestDetails from "./RequestDetails";
import MechanicUserTracking from "./MechanicUserTracking";
import NotificationScreen from "./NotificationScreen";
import HistoryScreen from "./HistoryScreen";
import AdminDashboard from "./AdminDashboard";
import AdminLoginPage from "./AdminLoginPage"
import QRCodeScreen from "./QRCodeScreen";
import MechanicDetailsScreen from "./MechanicDetailsScreen";
import ChatbotScreen from "./ChatbotScreen"
import RatingReviewScreen from "./RatingReviewScreen";
import MechanicProfile from "./mechanicprofile";
import ServiceOverScreen from "./ServiceOverScreen";
import ServiceOverScreenM from "./ServiceOverScreenM";
import VideoTutorialScreen from "./VideoTutorialScreen";
import SettingsPage from "./SettingsPage";
import { ThemeProvider } from "./ThemeContext";
import LoginForm from "./loginpage";
import RegisterScreen from "./registerpage";
import OTPVerificationScreen from "./validate";
import Registermech from "./registermech";
import OTPVerificationScreen1 from "./validatem";
import CardPaymentScreen from "./CardPaymentScreen";
import NetBankingScreen from "./NetBankingScreen";
import LoginMech from "./loginformmech";
const Stack = createStackNavigator();
function App() {
  return (
    <I18nextProvider i18n={i18n}>
    <ThemeProvider>
    <LanguageProvider > 
      <NavigationContainer>  
      {}
        <Stack.Navigator initialRouteName="Selection"   screenOptions={{headerShown : false}} >  
            <Stack.Screen name="Selection" component={SelectionPage} />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="Mechanic" component={MechanicScreen} />
            <Stack.Screen name="UserHome" component={UserHome} />
            <Stack.Screen name="AssistanceScreen" component={AssistanceScreen} />
            <Stack.Screen name="TroubleshootingSteps" component={TroubleshootingSteps} />
            <Stack.Screen name="AssitanceListScreen" component={AssitanceListScreen} />
            <Stack.Screen name="AssistanceDetailsScreen" component={AssistanceDetailsScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="TimeoutScreen" component={TimeoutScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="PaymentProceed" component={PaymentProceed} />
            <Stack.Screen name="LiveMechanicTracking" component={LiveMechanicTracking} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="MechanicHome" component={MechanicHome} />
            <Stack.Screen name="ActivationPage" component={ActivationPage} />
            <Stack.Screen name="RequestDetails" component={RequestDetails} />
            <Stack.Screen name="MechanicUserTracking" component={MechanicUserTracking} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} /> 
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="AdminLoginPage" component={AdminLoginPage} />
            <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
            <Stack.Screen name="MechanicDetailsScreen" component={MechanicDetailsScreen} />
            <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
            <Stack.Screen name="RatingReviewScreen" component={RatingReviewScreen} />
            <Stack.Screen name="MechanicProfile" component={MechanicProfile} />
            <Stack.Screen name="ServiceOverScreen" component={ServiceOverScreen}/>
            <Stack.Screen name="ServiceOverScreenM" component={ServiceOverScreenM}/>
            <Stack.Screen name="VideoTutorialScreen" component={VideoTutorialScreen}/>
            <Stack.Screen name="SettingsPage" component={SettingsPage}/>
            <Stack.Screen name="LoginForm" component={LoginForm}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
            <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen}/>
            <Stack.Screen name="OTPVerificationScreen1" component={OTPVerificationScreen1}/>
            <Stack.Screen name="Registermech" component={Registermech}/>
            <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen}/>
            <Stack.Screen name="NetBankingScreen" component={NetBankingScreen}/>
            <Stack.Screen name="LoginMech" component={LoginMech}/>
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
    </ThemeProvider>
    </I18nextProvider>
  );
}
export default App;