package space.reviewly.backend.service.fileResource;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Operations;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import space.reviewly.backend.config.ApplicationProperties;

@RequiredArgsConstructor
@Service
public class S3FileResourceService {

    private final ApplicationProperties applicationProperties;

    private final S3Operations s3Operations;

    public void uploadUserAvatar(MultipartFile avatar, String fileName) throws IOException {
        uploadFile(avatar, applicationProperties.getFileStorageBucketUsersAvatars(), fileName);
    }

    public void removeUserAvatar(String fileName) {
        s3Operations.deleteObject(
            applicationProperties.getFileStorageBucket(),
            applicationProperties.getFileStorageBucketUsersAvatars() + "/" + fileName
        );
    }

    public void uploadSiteIcon(MultipartFile siteIcon, String fileName) throws IOException {
        uploadFile(siteIcon, applicationProperties.getFileStorageBucketSitesIcons(), fileName);
    }

    public void uploadFile(MultipartFile file, String bucketName, String fileName) throws IOException {
        uploadFile(file, bucketName, fileName, ObjectCannedACL.PUBLIC_READ);
    }

    public void uploadFile(MultipartFile file, String bucketName, String fileName, ObjectCannedACL acl) throws IOException {
        s3Operations.upload(
            applicationProperties.getFileStorageBucket(),
            bucketName + "/" + fileName,
            file.getInputStream(),
            ObjectMetadata.builder()
                .acl(acl)
                .contentType(file.getContentType())
                .build()
        );
    }
}
