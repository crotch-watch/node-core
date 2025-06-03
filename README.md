# Introduction

1. I'm to do a deep dive into ***Node*** itself without cluttering with other tools and ***NPM packages*** and truly master this technology.

2. I'll use vital concepts to build various exciting projects *just* using Node.

3. This not only includes some Node.js essentials but also computer science and back-end engineering concepts.

## Understood [Event Emitters](https://nodejs.org/docs/latest/api/events.html#class-eventemitter) ✅

Learnt how Node's event driven architecture is enabled by EventEmitter, what is it and it's internals by creating a naive emitter implementation of my own.

## Understood [Buffers](https://nodejs.org/docs/latest/api/buffer.html#buffer) ✅

Deeply understood buffers and how to work directly with binary data.

Different ways of creating Buffers, how *safe* and *unsafe* allocations differ in their initialization, *fastest way* to allocate memory using Node's internal *memory pool*, proper way to *store* and *read* negative integers and much more.

## Understood [File System](https://nodejs.org/docs/latest/api/fs.html#file-system) ✅

As a back-end developer, I'll work with files a lot, be it saving some data to disk, handling file uploads and many other examples, so it's essential to have a good understanding of them and learning how Node.js deals with files resulting in mastery of the *"fs"* module.

What exactly is a *file* and *file data* associated with it, how does Node behind the scenes *requests* a file from an OS via *system calls* like *open()* and *rename()* and what are they, Different APIs Node exposes for file operations, performing CRUD operations on files.

## Understood [Streams](https://nodejs.org/docs/latest/api/stream.html#stream) ✅

In this section, I'm only going to use Node.js native *Streams* API to master Streams, to develop highly-performant apps capable of handling lots of data with ease while having great memory usage. I've learnt how to transfer data from ***Readable*** to ***Writable*** using buffers and learnt what issues we face reading memory and performance of application implemented a naive implementation of Stream using batching data before writing to *Writable*, understood what is ***draining*** and other methods they used to handle back-pressure.

Using Implementers API made ***Read*** ***Write*** ***Duplex*** ***Transform*** streams using internal methods like *_read* *_write* *_final* *_transform* etc.

I've built many mini-projects throughout the section, reading and writing to a file ***Billions*** of times while managing memory benchmarked code also an *Encryption-Decryption* app from scratch that could encrypt lots of data by directly modifying the binary data. This section lays the foundation for future sections where I'll utilize Streams heavily to create powerful and efficient network applications.

## Understanding [Networking](https://nodejs.org/docs/latest/api/net.html) ✅

This section is all about going deep into how computers talk to each other, laying the groundwork for building low-level network apps using only Node.

I'll explore:

  - What exactly a network is and how devices communicate
  - How the internet works under the hood
  - MAC addresses, what they are and why they matter
  - IP addresses (IPv4 & IPv6) and their differences
  - TCP vs UDP—how reliable and fast communication protocols work
  - DNS—how human-readable domains get resolved to IP addresses
  - Fundamentals of deployment—how apps are hosted and exposed online

To put this knowledge into practice, I’ll build two low-level applications directly on top of TCP using just Node.js—
a real-time Chat App and a File Uploader, both without relying on any frameworks or extra tools.

To deepen my understanding even more, I’ll analyze the raw bytes exchanged during network communication using Wireshark, observing how protocols like HTTP, FTP, DNS, SSH, and more work on a binary level.

This broadened my perspective and showed that Node.js isn’t limited to just building web servers—it can be used to power any kind of networked software with precision and performance.
