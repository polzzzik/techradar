import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 32,
  },

});

const currentDate = new Date();

const Template = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Techradar</Text>
      </View>
      <View style={styles.section}>
        <Text>
          At{' '}
          {`${currentDate.getDay()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`}
        </Text>
      </View>
    </Page>
  </Document>
);

export default Template;
