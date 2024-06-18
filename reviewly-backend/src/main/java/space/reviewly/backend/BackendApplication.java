package space.reviewly.backend;

//import nz.net.ultraq.thymeleaf.layoutdialect.LayoutDialect;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
//import org.springframework.context.annotation.Bean;

import java.util.concurrent.ExecutionException;
import org.xbill.DNS.MXRecord;
import org.xbill.DNS.Name;
import org.xbill.DNS.Record;
import org.xbill.DNS.TXTRecord;
import org.xbill.DNS.TextParseException;
import org.xbill.DNS.Type;
import org.xbill.DNS.lookup.LookupSession;

/*@SpringBootApplication
@ConfigurationPropertiesScan*/
public class BackendApplication {

    public static void main(String[] args) throws TextParseException, ExecutionException, InterruptedException {
//        SpringApplication.run(BackendApplication.class, args);

        LookupSession s = LookupSession.defaultBuilder().build();
        Name mxLookup = Name.fromString("reviewly.space.");
        s.lookupAsync(mxLookup, Type.TXT)
            .whenComplete(
                (answers, ex) -> {
                    if (ex == null) {
                        if (answers.getRecords().isEmpty()) {
                            System.out.println(mxLookup + " has no MX");
                        } else {
                            for (Record rec : answers.getRecords()) {
                                TXTRecord txt = (TXTRecord) rec;
                                System.out.println("Host" );
                            }
                        }
                    } else {
                        ex.printStackTrace();
                    }
                })
            .toCompletableFuture().get();
    }

    /*@Bean
    public LayoutDialect layoutDialect() {
        return new LayoutDialect();
    }*/
}
