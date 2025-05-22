import ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';

// Set FFmpeg path
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

function createVideoFromImage(
    inputImagePath: string,
    outputVideoPath: string,
    durationSeconds: number = 2
): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputImagePath)
            .inputOptions(['-loop 1'])
            .outputOptions([
                `-t ${durationSeconds}`,
                '-c:v mjpeg',
                '-q:v 2',
                // Complex filter to create square output:
                // 1. Scale image to fit within 720x720 maintaining aspect ratio
                // 2. Pad the result to exactly 720x720 with white background
                '-vf scale=720:720:force_original_aspect_ratio=decrease,pad=720:720:(ow-iw)/2:(oh-ih)/2:white',
                '-r 30'
            ])
            .output(outputVideoPath)
            .on('end', () => {
                console.log('Video creation completed');
                resolve();
            })
            .on('error', (err) => {
                console.error('Error creating video:', err);
                reject(err);
            })
            .run();
    });
}

// Example usage
export async function main(jpgFilePath: string, outputFilePath: string) {
    const inputImage = path.join(__dirname, jpgFilePath);
    const outputVideo = path.join(__dirname, outputFilePath);

    try {
        await createVideoFromImage(inputImage, outputVideo);
        console.log('Video created successfully');
    } catch (error) {
        console.error('Failed to create video:', error);
    }
}