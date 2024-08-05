package space.reviewly.backend.service.fileResource;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Operations;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.utils.TikaWrapper;

@RequiredArgsConstructor
@Service
public class S3FileResourceService {

    private final ApplicationProperties applicationProperties;

    private final S3Operations s3Operations;

    public void uploadUserAvatar(MultipartFile avatar, String fileName) throws IOException {
        uploadFile(avatar.getBytes(), applicationProperties.getFileStorageBucketUsersAvatars(), fileName);
    }

    public void removeUserAvatar(String fileName) {
        s3Operations.deleteObject(
            applicationProperties.getFileStorageBucket(),
            applicationProperties.getFileStorageBucketUsersAvatars() + "/" + fileName
        );
    }

    public void uploadSiteIcon(byte[] byteArray, String fileName) {
        uploadFile(byteArray, applicationProperties.getFileStorageBucketSitesIcons(), fileName);
    }

    public void uploadFile(byte[] byteArray, String bucketName, String fileName) {
        uploadFile(byteArray, bucketName, fileName, ObjectCannedACL.PUBLIC_READ);
    }

    public void uploadFile(byte[] byteArray, String bucketName, String fileName, ObjectCannedACL acl) {
        String contentType = new TikaWrapper().detect(byteArray);

        s3Operations.upload(
            applicationProperties.getFileStorageBucket(),
            bucketName + "/" + fileName,
            new ByteArrayInputStream(byteArray),
            ObjectMetadata.builder()
                .acl(acl)
                .contentType(contentType)
                .build()
        );
    }
}
