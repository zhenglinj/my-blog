## Hive MetaStoreClient VS JDBC HiveQL

This Project explains how to use HiveMetaStoreClient, HiveJdbcDriver, HiveServer2


## Kerberos

### Hadoop: HDFS and MapReduce with Kerberos authentication

		// This is for JDBC only
		System.setProperty("java.security.auth.login.config", jaasConfPath); // TODO

		if (DEBUG) {
			System.setProperty("sun.security.jgss.debug", "true");
			System.setProperty("sun.security.krb5.debug", "true");
			System.setProperty("java.security.debug", "gssloginconfig,configfile,configparser,logincontext");
			System.setProperty("log4j.logger.org.apache.hadoop.hbase", "DEBUG");
		}

		/*
		 * You need a Kerberos configuration client on the executing machine. If
		 * your default is set up correctly, use that and leave KRB_CONF_PATH
		 * empty.
		 * 
		 * The conf (or ini) needs to specify the "default_realm" and its kdc
		 * servers
		 * 
		 * Failure to process the keytab file may be a result of bad conf setup
		 * 
		 * Domain names are case-sensitive, so make sure they match
		 */
		System.setProperty("java.security.krb5.conf", krbConfPath);

		conf = new Configuration();

		/*
		 * Error: "unknown host", bad host name Error: "connection refused", not
		 * the name node?, wrong port? Error: "in state standby", you are
		 * accessing a node in standby mode
		 */
		conf.set("fs.defaultFS", hdfsNodeUrl);

		// Without this "SIMPLE authentication is not enabled"
		conf.set("hadoop.security.authentication", "kerberos");

		// Without this "No common protection layer between client and server"
		conf.set("hadoop.rpc.protection", "privacy");

		// Without this "Failed to specify server's Kerberos principal name"
		conf.set("dfs.namenode.kerberos.principal", hdfsPrincipal); //"hdfs/_HOST@CURNX.COM"

		UserGroupInformation.setConfiguration(conf);

		/*
		 * If you see a message like "unsupported keytype (18)" in the debug
		 * info when reading the keytab, you may need to install the Java
		 * "JCE Unlimited Strength" policy files that are needed to support
		 * stronger encryption
		 */
		try {
			UserGroupInformation.loginUserFromKeytab(usr, keyTabPath);
		} catch (IOException e1) {
			e1.printStackTrace();
		}

### Hive: Hive with Kerberos authentication

#### HiveMetaStoreClient

		HiveConf conf = new HiveConf();
		conf.set("hadoop.security.authentication", "kerberos");
		conf.setVar(HiveConf.ConfVars.HIVE_SERVER2_AUTHENTICATION, "kerberos"); //conf.set("hive.server2.authentication", "kerberos");
		conf.setVar(HiveConf.ConfVars.METASTOREURIS, thriftUrl);
		conf.setVar(HiveConf.ConfVars.METASTORE_KERBEROS_PRINCIPAL, principal);
		conf.setVar(HiveConf.ConfVars.METASTORE_KERBEROS_KEYTAB_FILE, keyTabPath);
		conf.setVar(HiveConf.ConfVars.METASTORE_USE_THRIFT_SASL, "true");
		
		UserGroupInformation.setConfiguration(conf);
		/*
		 * If you see a message like "unsupported keytype (18)" in the debug
		 * info when reading the keytab, you may need to install the Java
		 * "JCE Unlimited Strength" policy files that are needed to support
		 * stronger encryption
		 */
		try {
			UserGroupInformation.loginUserFromKeytab(usr, keyTabPath);
		} catch (IOException e1) {
			e1.printStackTrace();
		}


#### HiveJdbcDriver

		// This is for JDBC only
		System.setProperty("java.security.auth.login.config", jaasConfPath); // TODO

		Configuration conf = new Configuration();
		// conf.set("fs.defaultFS", HDFS_URL);
		conf.set("hadoop.security.authentication", "kerberos");
		conf.set("hadoop.rpc.protection", "privacy");
		conf.set("dfs.namenode.kerberos.principal", "hive/_HOST@CURNX.COM");
		conf.set("hive.server2.authentication", "kerberos");

		/*
		 * If you see a message like "unsupported keytype (18)" in the debug
		 * info when reading the keytab, you may need to install the Java
		 * "JCE Unlimited Strength" policy files that are needed to support
		 * stronger encryption
		 */
		try {
			UserGroupInformation.setConfiguration(conf);
			this.ugi = UserGroupInformation.loginUserFromKeytabAndReturnUGI(usr, keyTabPath);
		} catch (IOException e) {
			e.printStackTrace();
			logger.error(e);
			System.exit(1);
		}

		try {
			Class.forName("org.apache.hive.jdbc.HiveDriver");
			// Class.forName("com.cloudera.hive.jdbc41.HS2Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			logger.error(e);
			System.exit(1);
		}

		try {
			con = (Connection) this.ugi.doAs((PrivilegedExceptionAction<Object>) () -> {
				Connection c = null;
				try {
					c = DriverManager.getConnection(jdbcUrl);
				} catch (SQLException e) {
					e.printStackTrace();
					logger.error(e);
				}
				return c;
			});
		} catch (IOException e) {
			logger.error(e);
			System.exit(1);
		} catch (InterruptedException e) {
			logger.error(e);
			System.exit(1);
		}

### Spark: Spark with Kerberos authentication

https://github.com/Re1tReddy/HiveMetaStoreClient

https://stackoverflow.com/questions/33377198/connecting-to-hivemetastore-on-cluster-with-kerberos

https://community.hortonworks.com/questions/21993/hcatalog-and-kerberos.html

https://github.com/onefoursix/Cloudera-Impala-JDBC-Example
