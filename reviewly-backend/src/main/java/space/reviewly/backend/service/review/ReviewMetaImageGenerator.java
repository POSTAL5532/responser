package space.reviewly.backend.service.review;

import space.reviewly.backend.model.Review;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.font.LineBreakMeasurer;
import java.awt.font.TextAttribute;
import java.awt.font.TextLayout;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.AttributedCharacterIterator;
import java.text.AttributedString;
import javax.imageio.ImageIO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ReviewMetaImageGenerator {

    public static final int IMAGE_WIDTH = 1080;
    public static final int IMAGE_HEIGHT = 540;

    public static final int PADDING_X = 50;
    public static final int PADDING_Y = 50;
    public static final int TEXT_PADDING_Y = 180;

    public static final Color MAIN_COLOR = new Color(0,0,0,0.6f);

    public ByteArrayOutputStream generate(Review review) {
        BufferedImage image = new BufferedImage(IMAGE_WIDTH, IMAGE_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = prepareGraphics(image);

        drawLogo(graphics);
        drawRating(graphics, review.getRating());
        drawText(review.getText(), graphics);

        ByteArrayOutputStream pngContent = new ByteArrayOutputStream();

        try {
            ImageIO.write(image, "png", pngContent);
        } catch (IOException ex) {
            log.error("Meta image generation error", ex);
        }

        return pngContent;
    }

    private Graphics2D prepareGraphics(BufferedImage image) {
        Graphics2D graphics = (Graphics2D) image.getGraphics();
        graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        graphics.setColor(Color.white);
        graphics.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
        graphics.drawImage(image, 0, 0, null);

        return graphics;
    }

    private void drawRating(Graphics2D graphics, byte rating) {
        BufferedImage activeStar;
        BufferedImage inactiveStar;

        try {
            InputStream actvieStarImageInputStream = getClass().getResourceAsStream("/static/img/active_star.png");
            assert actvieStarImageInputStream != null;
            
            InputStream inactiveStarImageInputStream = getClass().getResourceAsStream("/static/img/inactive_satr.png");
            assert inactiveStarImageInputStream != null;

            activeStar = ImageIO.read(actvieStarImageInputStream);
            inactiveStar = ImageIO.read(inactiveStarImageInputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        int starWidth = 54;
        int starsYPosition = 54;
        int firstStarXPosition = 740;
        int lastStarXPosition = 0;

        for (int i = 0; i < rating; i++) {
            lastStarXPosition = firstStarXPosition + (i * starWidth);
            graphics.drawImage(activeStar, lastStarXPosition, starsYPosition, null);
        }

        lastStarXPosition += starWidth;

        for (int i = 0; i < (5 - rating); i++) {
            graphics.drawImage(inactiveStar, lastStarXPosition + (i * starWidth), starsYPosition, null);
        }

        graphics.drawString(getAttributedCharacterIterator(rating + "/5", 43, TextAttribute.WEIGHT_BOLD), 655, 93);
    }

    private void drawLogo(Graphics2D graphics) {
        BufferedImage logo;

        try {
            InputStream labelImageInputStream = getClass().getResourceAsStream("/static/img/label.png");
            assert labelImageInputStream != null;
            logo = ImageIO.read(labelImageInputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        graphics.drawImage(logo, PADDING_X, PADDING_Y, null);
    }

    private void drawText(String message, Graphics2D graphics) {
        AttributedCharacterIterator messageIterator = getAttributedCharacterIterator(message, getFontSize(message));
        FontRenderContext frc = graphics.getFontRenderContext();
        LineBreakMeasurer messageLBM = new LineBreakMeasurer(messageIterator, frc);

        float wrappingWidth = IMAGE_WIDTH - PADDING_X - PADDING_X;
        float y = TEXT_PADDING_Y;

        while (messageLBM.getPosition() < messageIterator.getEndIndex()) {
            TextLayout textLayout = messageLBM.nextLayout(wrappingWidth);
            y += textLayout.getAscent();

            if (y >= 490) {
                graphics.drawString(getAttributedCharacterIterator("...", getFontSize(message)), PADDING_X, 490);
                break;
            } else {
                textLayout.draw(graphics, (float) PADDING_X, y);
            }

            y += textLayout.getDescent() + textLayout.getLeading();
        }
    }

    private AttributedCharacterIterator getAttributedCharacterIterator(String text, float fontSize) {
        return getAttributedCharacterIterator(text, fontSize, TextAttribute.WEIGHT_MEDIUM);
    }

    private AttributedCharacterIterator getAttributedCharacterIterator(String text, float fontSize, Float wight) {
        AttributedString attributedString = new AttributedString(text);
        attributedString.addAttribute(TextAttribute.FONT, getFont().deriveFont(fontSize));
        attributedString.addAttribute(TextAttribute.WEIGHT, wight);
        attributedString.addAttribute(TextAttribute.FOREGROUND, MAIN_COLOR);

        return attributedString.getIterator();
    }

    private float getFontSize(String text) {
        float fontSize;

        if (text.length() > 240) {
            fontSize = 30;
        } else if (text.length() > 120) {
            fontSize = 42;
        } else {
            fontSize = 54;
        }

        return fontSize;
    }

    private Font getFont() {
        try {
            InputStream fontInputStream = getClass().getResourceAsStream("/static/font/Outfit-Medium.ttf");
            assert fontInputStream != null;
            return Font.createFont(Font.TRUETYPE_FONT, fontInputStream);
        } catch (FontFormatException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
