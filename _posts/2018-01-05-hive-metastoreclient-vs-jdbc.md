---
title: "Hive MetaStoreClient VS JDBC HiveQL"
excerpt: "介绍HiveMetaStore的部署架构，以及，Hive Partition Client组件根据Hive Metastore的部署架构采用不同的库实现不同版本并简单比较，MetaStoreClient对比JDBC HiveQL"
category: "technology"
analytics: true
comments: true
tags: [hive, big-data]
---
{% include JB/setup %}

介绍HiveMetaStore的部署架构，以及，Hive Partition Client组件根据Hive Metastore的部署架构采用不同的库实现不同版本并简单比较，MetaStoreClient对比JDBC HiveQL

---

## Hive Metastore配置

基于CDH大数据平台配置Hive Metastore，有三种不同的部署模式。

### Embedded Mode

**Cloudera建议用于体验** 这种模式容易配置，但是同一时间只支持单用户连接并且生产也没有保障。

### Local Mode

Hive Metastore服务和Metastore数据库部署在不同的主机，用JDBC连接。

### Remote Mode

**Cloudera建议这种模式用于生产环境**

> In Remote mode, the Hive metastore service runs in its own JVM process. HiveServer2, HCatalog, Impala, and other processes communicate with it using the Thrift network API (configured using the hive.metastore.uris property). The metastore service communicates with the metastore database over JDBC (configured using the javax.jdo.option.ConnectionURL property). The database, the HiveServer process, and the metastore service can all be on the same host, but running the HiveServer process on a separate host provides better availability and scalability.
> 
> The main advantage of Remote mode over Local mode is that Remote mode does not require the administrator to share JDBC login information for the metastore database with each Hive user. HCatalog requires this mode.

具体的配置过程见Cloudera文档[Configuring the Hive Metastore](https://www.cloudera.com/documentation/enterprise/5-8-x/topics/cdh_ig_hive_metastore_configure.html)

## Hive MetaStoreClient VS JDBC HiveQL

## 参考

[https://github.com/Re1tReddy/HiveMetaStoreClient](https://github.com/Re1tReddy/HiveMetaStoreClient) This Project explains how to use HiveMetaStoreClient, HiveJdbcDriver, HiveServer2
[https://stackoverflow.com/questions/33377198/connecting-to-hivemetastore-on-cluster-with-kerberos](https://stackoverflow.com/questions/33377198/connecting-to-hivemetastore-on-cluster-with-kerberos)
[https://community.hortonworks.com/questions/21993/hcatalog-and-kerberos.html](https://community.hortonworks.com/questions/21993/hcatalog-and-kerberos.html)
[https://github.com/onefoursix/Cloudera-Impala-JDBC-Example](https://github.com/onefoursix/Cloudera-Impala-JDBC-Example)
