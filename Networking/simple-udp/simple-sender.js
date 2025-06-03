import dgram from 'node:dgram';

const sender = dgram.createSocket('udp4');

const PORT = 3000
const ADDRESS = '127.0.0.1'

sender.send('string', PORT, ADDRESS, (error, bytes) => {
  if (error) {
    console.info('ERROR:', error);
  }

  console.info('BYTES SENT', bytes);

 /** @todo since UDP does not care about connection or any ACK
  *     even when the data is being sent and there is no connection
  *     it isn't throwing any error just as TCP would've.
  * */

  sender.close(() => {
    console.info('closing UDP socket manually')
  })
});
