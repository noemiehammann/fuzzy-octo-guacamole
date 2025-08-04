import React, { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getDailyProgram } from './schedule';

export default function App() {
  const program = getDailyProgram();

  useEffect(() => {
    async function schedule() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      await Notifications.cancelAllScheduledNotificationsAsync();

      const now = new Date();
      for (const item of program) {
        const [hour, minute] = item.time.split(':').map(Number);
        const trigger = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
        if (trigger > now) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Rappel activité',
              body: item.activity,
            },
            trigger,
          });
        }
      }
    }

    schedule();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programme activité télétravail</Text>
      <ScrollView>
        {program.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.activity}>{item.activity}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  item: { flexDirection: 'row', marginBottom: 10 },
  time: { width: 60, fontWeight: '500' },
  activity: { flex: 1 },
});
