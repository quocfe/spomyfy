import React from 'react';
import { View, Text } from 'react-native';
import  ToastProps  from 'react-native-toast-notifications';
// import { Bell } from 'lucide-react-native';

const CustomToast = ({ data }: { data: ToastProps }) => {
  const { title, body } = data as any; // ép kiểu nếu cần

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginHorizontal: 20,
        marginTop: 20,
      }}
    >
      {/* <Bell color="#00B14F" size={24} style={{ marginRight: 12 }} /> */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>{title || 'Thông báo'}</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{body}</Text>
      </View>
    </View>
  );
};

export default CustomToast;
