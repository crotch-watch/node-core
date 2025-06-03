import dgram from 'node:dgram';

/** @todo keep in mind that UDP is connectionless
 *     meaning I don't need another endpoint for the receiver to work.
 *     in TCP unless there are 2 endpoints the sockets are useless
 *     in UDP connections isn't required since there is no ACKS it just receives data in no order
 *     NOTE: connections are only required if there is a ACKS for packet integrity and ordering.
 * */

const receiver = dgram.createSocket('udp4');

receiver.on('error', error => {
  console.info('ERROR:', error);
  receiver.close();
});

receiver.on('message', (msg, remoteInfo) => {
  console.info(
    `Received message: ${msg} from ${remoteInfo.address}:${remoteInfo.port}`
  );
});

receiver.on('listening', () => {
  const address = receiver.address();

  console.info(`listening on ${address.address}@${address.port}`);
});

/** @todo IMPORTANT: I can use both TCP and UDP applications on the same port
 *      and there would be no conflict as these are 2 diff. protocols and will have their own
 *      UIDs from which frames could be differentiated and sent to it's proper process.
 * */

const PORT = 3000;
receiver.bind(PORT);
