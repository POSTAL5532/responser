package com.responser.backend.service.review;

import com.responser.backend.model.Review;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
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

    public static final Color RED_COLOR = Color.decode("#FF4539");
    public static final Color YELOW_COLOR = Color.decode("#DBC72A");
    public static final Color GREEN_COLOR = Color.decode("#23C653");
    public static final Color MAIN_COLOR = Color.decode("#28293D");

    public ByteArrayOutputStream generate(Review review) {
        String message = review.getText();

        GraphicsEnvironment.getLocalGraphicsEnvironment().registerFont(getFont());

        BufferedImage image = new BufferedImage(IMAGE_WIDTH, IMAGE_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = prepareGraphics(image);

        drawLogo(graphics);
        drawRating(graphics, review.getRating());

        AttributedCharacterIterator messageIterator = getAttributedCharacterIterator(message, getFontSize(message), MAIN_COLOR);
        FontRenderContext frc = graphics.getFontRenderContext();
        LineBreakMeasurer messageLBM = new LineBreakMeasurer(messageIterator, frc);

        float wrappingWidth = IMAGE_WIDTH - PADDING_X - PADDING_X;
        float y = TEXT_PADDING_Y;

        while (messageLBM.getPosition() < messageIterator.getEndIndex()) {
            TextLayout textLayout = messageLBM.nextLayout(wrappingWidth);
            y += textLayout.getAscent();

            if (y >= 490) {
                graphics.drawString(getAttributedCharacterIterator("...", getFontSize(message), MAIN_COLOR), PADDING_X, 490);
                break;
            } else {
                textLayout.draw(graphics, (float) PADDING_X, y);
            }

            y += textLayout.getDescent() + textLayout.getLeading();
        }

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
        BufferedImage star;
        Color ratingColor;

        if (rating >= 4) {
            ratingColor = GREEN_COLOR;
        } else if (rating > 2) {
            ratingColor = YELOW_COLOR;
        } else {
            ratingColor = RED_COLOR;
        }

        try {
            InputStream starImageInputStream = getClass().getResourceAsStream("/static/img/star.png");
            assert starImageInputStream != null;
            star = ImageIO.read(starImageInputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        graphics.drawImage(star, 650, 40, null);
        graphics.drawString(getAttributedCharacterIterator(rating + " / 5", 92, ratingColor), 750, 115);
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

    private AttributedCharacterIterator getAttributedCharacterIterator(String text, int fontSize, Color color) {
        AttributedString attributedString = new AttributedString(text);
        attributedString.addAttribute(TextAttribute.SIZE, fontSize);
        attributedString.addAttribute(TextAttribute.WEIGHT, TextAttribute.WEIGHT_BOLD);
        attributedString.addAttribute(TextAttribute.FOREGROUND, color);

        return attributedString.getIterator();
    }

    private int getFontSize(String text) {
        int fontSize;

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
            InputStream fontInputStream = getClass().getResourceAsStream("/static/font/Inter-Bold.ttf");
            assert fontInputStream != null;
            return Font.createFont(Font.TRUETYPE_FONT, fontInputStream);
        } catch (FontFormatException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
